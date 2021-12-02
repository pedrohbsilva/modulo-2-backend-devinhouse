import { useState } from "react";
import api from "./services/api";

function App() {
  const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Escolha o arquivo');
    const onChangeHandler = (event) => {
      setFile(event.target.files[0]);  
      setFileName(event.target.files[0].name); 
  }

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      const formData = new FormData(); 
      formData.append('file', file);
      try {
        const response = await api.post('/', formData, {
          headers: {
              'Content-Type': 'multipart/form-data' 
          }
       });
       console.log(response)
      } catch (error) {
        console.log(error)
      }
  }


  return (
    <form onSubmit={onSubmitHandler}>
        <div>
          <input type="file" onChange={onChangeHandler} />
          <label htmlFor="customFile">
            {fileName}
          </label>
        </div>
        <input
          type="submit"
          value="Enviar o arquivo"
        />
      </form>
  );
}

export default App;
