import React, { 
  useState, 
  useCallback, 
  forwardRef, 
  useImperativeHandle
} from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#f50057';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#f50057';
  }
  return '#eeeeee';
}

const ZoneContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

export default forwardRef((props, ref) => {
  const [file, setFile] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  useImperativeHandle(ref, () => ({
    checkFields: () => {
      if (file === null) return props.showError('File is required.');

      props.setFile(file);
      props.handleNext();
    }
  }));

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  return (
    <ZoneContainer {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>{file ? file.name : 'Drag "n" drop some files here, or click to select files'}</p>
    </ZoneContainer>
  );
});