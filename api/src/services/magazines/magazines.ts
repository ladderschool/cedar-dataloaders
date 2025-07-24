import type {
  QueryResolvers,
  MutationResolvers,
  MagazineRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const magazines: QueryResolvers['magazines'] = () => {
  return db.magazine.findMany()
}

export const magazine: QueryResolvers['magazine'] = ({ id }) => {
  return db.magazine.findUnique({
    where: { id },
  })
}

export const createMagazine: MutationResolvers['createMagazine'] = ({
  input,
}) => {
  return db.magazine.create({
    data: input,
  })
}

export const updateMagazine: MutationResolvers['updateMagazine'] = ({
  id,
  input,
}) => {
  return db.magazine.update({
    data: input,
    where: { id },
  })
}

export const deleteMagazine: MutationResolvers['deleteMagazine'] = ({ id }) => {
  return db.magazine.delete({
    where: { id },
  })
}

export const Magazine: MagazineRelationResolvers = {
  pages: (_obj, { root, context }) => {
    return context.pages.load(root.id)
  },
}
