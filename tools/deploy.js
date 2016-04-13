import Rsync from 'rsync';

const rsync = Rsync.build({
    destination: 'deploy@tiktak.io:~/apps/billary-web/',
    source: './dist/',
    incremental: true,
    progress: true,
    recursive: true,
    relative: true,
    emptyDirectories: true,
    clean: true,
    exclude: ['.DS_Store'],
    include: []
});
rsync.execute((error, stdout, stderr) => {
  if (error) {
    console.log(stderr);
  }
  return 1;
});
