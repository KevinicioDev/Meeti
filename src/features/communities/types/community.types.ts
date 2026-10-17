
import { community } from '@/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
//para insertar datos
export type InsertCommunity = InferInsertModel<typeof community>
//para obtener datos
export type SelectCommunity = InferSelectModel<typeof community>

export type CommunityPermissions = {
    canEdit: boolean
    canDelete: boolean
    canJoin: boolean
    canLeave: boolean
    canViewMembers: boolean
}

export type CommunityContext = {
    isAdmin: boolean
    isMember: boolean
}

export type CommunityWithPermission = {
    data: SelectCommunity
    context: CommunityContext
    permissions: CommunityPermissions
}