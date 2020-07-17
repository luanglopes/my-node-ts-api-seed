import { createConnection, getConnectionOptions, EntitySchema } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/ban-types
const adjustPathsToBuild = (path: string | Function | EntitySchema): string =>
  path.toString().replace('src', 'dist').replace('.ts', '.js')

const initDatabase = async (): Promise<void> => {
  const connOptions = await getConnectionOptions()

  if (process.env.NODE_ENV === 'production') {
    Object.assign(connOptions, {
      entities: connOptions.entities?.map(adjustPathsToBuild),
      migrations: connOptions.migrations?.map(adjustPathsToBuild),
    })
  }

  await createConnection(connOptions)
}

// eslint-disable-next-line no-console
initDatabase().catch(console.error)
