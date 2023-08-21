export function findFlutterProjectRoot ()
{

  let currentDir = Deno.cwd();
  let previousDir = "";
  let flutterProjectRoot: string | null = null;


  while ( currentDir !== previousDir )
  {
    const files = Deno.readDirSync( currentDir );

    for ( const file of files )
    {
      if ( file.name === "pubspec.yaml" )
      {
        flutterProjectRoot = currentDir;
        break;
      }
    }

    previousDir = currentDir;
    currentDir = Deno.realPathSync( `${ currentDir }/..` );
  }

  return flutterProjectRoot;
}