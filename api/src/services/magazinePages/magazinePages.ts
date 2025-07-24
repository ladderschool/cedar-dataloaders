import type {
  QueryResolvers,
  MutationResolvers,
  MagazinePageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const magazinePages: QueryResolvers['magazinePages'] = () => {
  return db.magazinePage.findMany()
}

export const magazinePage: QueryResolvers['magazinePage'] = ({ id }) => {
  return db.magazinePage.findUnique({
    where: { id },
  })
}

export const createMagazinePage: MutationResolvers['createMagazinePage'] = ({
  input,
}) => {
  return db.magazinePage.create({
    data: input,
  })
}

export const updateMagazinePage: MutationResolvers['updateMagazinePage'] = ({
  id,
  input,
}) => {
  return db.magazinePage.update({
    data: input,
    where: { id },
  })
}

export const deleteMagazinePage: MutationResolvers['deleteMagazinePage'] = ({
  id,
}) => {
  return db.magazinePage.delete({
    where: { id },
  })
}

export const MagazinePage: MagazinePageRelationResolvers = {
  magazine: (_obj, { root }) => {
    return db.magazinePage.findUnique({ where: { id: root?.id } }).magazine()
  },
}
