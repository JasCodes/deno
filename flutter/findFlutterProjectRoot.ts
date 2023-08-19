export async function findFlutterProjectRoot (): Promise<string | null>
{
  const cwd = Deno.cwd();
  for await ( const dirEntry of Deno.readDir( cwd ) )
  {
    if ( dirEntry.isDirectory )
    {
      const flutterRoot = await findFlutterProjectRootRecursive(
        `${ cwd }/${ dirEntry.name }`
      );
      if ( flutterRoot )
      {
        return flutterRoot;
      }
    }
  }
  return null;
}

async function findFlutterProjectRootRecursive (
  dirPath: string
): Promise<string | null>
{
  for await ( const dirEntry of Deno.readDir( dirPath ) )
  {
    if ( dirEntry.name === "pubspec.yaml" )
    {
      return dirPath;
    } else if ( dirEntry.isDirectory )
    {
      const flutterRoot = await findFlutterProjectRootRecursive(
        `${ dirPath }/${ dirEntry.name }`
      );
      if ( flutterRoot )
      {
        return flutterRoot;
      }
    }
  }
  return null;
}

const flutterProjectRoot = await findFlutterProjectRoot();
if ( !flutterProjectRoot )
{
  console.error( "Could not find Flutter project root" );
  Deno.exit( 1 );
}

console.log( `Flutter project root: ${ flutterProjectRoot }` );