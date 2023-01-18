export const chooseFile = async () => {
  const [fileHandle] =  await window.showOpenFilePicker();
  return fileHandle;
}

export const saveToFile = async (obj) => {
  const fileHandle = await getNewFileHandle();

  try {
    const savedFile = await writeFile(fileHandle, JSON.stringify(obj, null, '\t'));
    console.log('File saved successfully')
    return {
      status: 'success',
      fileHandle,
      savedFile,
    };

  } catch (error) {
    console.error('Unable to save file', error);
    return {
      status: 'error'
    }
  }
}

export const getNewFileHandle = async () => {
  const options = {
    types: [
      {
        description: 'JSON Files',
        accept: {
          'text/plain': ['.json'],
        },
      },
    ],
  }
  const handle = await window.showSaveFilePicker(options);
  return handle;
}
// fileHandle is an instance of FileSystemFileHandle..
export const writeFile = async (fileHandle, contents) => {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}