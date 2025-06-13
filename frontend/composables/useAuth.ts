import { Client, Account, Databases, ID } from 'appwrite'
import type { Models } from 'appwrite'

export function useAuth() {
  const config = useRuntimeConfig()

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId)

  const account = new Account(client)
  const databases = new Databases(client)

  const getCurrentUser = (): Promise<Models.User<Models.Preferences>> => {
    return account.get()
  }

  const login = (email: string, password: string): Promise<Models.Session> => {
    return account.createEmailPasswordSession(email, password)
  }

  const register = async (email: string, password: string): Promise<Models.Session> => {
    await account.create(ID.unique(), email, password)
    return await account.createEmailPasswordSession(email, password)
  }

  const logout = (): Promise<{}> => {
    return account.deleteSession('current')
  }

  return {
    client,
    account,
    databases,
    getCurrentUser,
    login,
    register,
    logout,
  }
}
