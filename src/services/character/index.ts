import { Character, CHARACTER_CLASSIFICATION, CHARACTER_TYPE, STATUS } from '@prisma/client';
import { AuthenticatedUser } from '../../infrastructure/authentication';
import { getPrisma } from '../../infrastructure/database';
import { AnyObject, PaginationInput, PaginationOutput, Uuid } from '../../utilities/global-types';

export type CharacterCreateInput = {
  name: string;
  metaName?: string;
  notes?: string;
  type: CHARACTER_TYPE;
  classification: CHARACTER_CLASSIFICATION;
  maxHealth: number;
  armourClass: number;
  initiativeModifier?: number;
};

export const CharacterService = {
  create: async (user: AuthenticatedUser, input: CharacterCreateInput) => {
    return await getPrisma().character.create({ data: { ...input, ownerId: user.id } });
  },

  update: async (user: AuthenticatedUser, characterUuid: Uuid, input: Partial<CharacterCreateInput>) => {
    return await getPrisma().character.update({ where: { uuid: characterUuid, ownerId: user.id }, data: { ...input } });
  },

  get: async (user: AuthenticatedUser, characterUuid: Uuid) => {
    return await getPrisma().character.findUnique({ where: { uuid: characterUuid, ownerId: user.id } });
  },

  page: async (user: AuthenticatedUser, input: PaginationInput): Promise<PaginationOutput<Character>> => {
    const { page, pageSize, search } = input;
    const where = { ownerId: user.id, status: STATUS.ACTIVE } as AnyObject;
    if (search?.length) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { metaName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    const characters = await getPrisma().character.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize
    });
    const totalMatches = await getPrisma().character.count({ where });
    return {
      ...input,
      total: totalMatches,
      data: characters
    };
  }
};
