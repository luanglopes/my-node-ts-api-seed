import { createConnection, getConnectionOptions, EntitySchema } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/ban-types
const adjustPathsAndExtensionsToBuild = (path: string | Function | EntitySchema): string =>
  path.toString().replace('src', 'dist').replace('.ts', '.js')

const initDatabase = async (): Promise<void> => {
  const connOptions = await getConnectionOptions()

  const fileExtension = __filename.split('/').pop().split('.').pop()

  if (fileExtension === 'js') {
    Object.assign(connOptions, {
      entities: connOptions.entities?.map(adjustPathsAndExtensionsToBuild),
      migrations: connOptions.migrations?.map(adjustPathsAndExtensionsToBuild),
    })
  }

  await createConnection(connOptions)
}

// eslint-disable-next-line no-console
initDatabase().catch(console.error)
