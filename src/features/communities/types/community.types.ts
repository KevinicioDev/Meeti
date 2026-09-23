
import { community } from '@/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
//para insertar datos
export type InsertCommunity = InferInsertModel<typeof community>
//para obtener datos
export type SelectCommunity = InferSelectModel<typeof community>