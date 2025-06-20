import { Client, Account, Databases, Storage, ID } from 'appwrite'

export const useAppwrite = () => {
  const config = useRuntimeConfig()

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId)

  const account = new Account(client)
  const databases = new Databases(client)
  const storage = new Storage(client)

  return { client, account, databases, storage, ID }
}
