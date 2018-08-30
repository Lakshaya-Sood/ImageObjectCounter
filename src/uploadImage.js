import React from 'react';
import Dropzone from 'react-dropzone';
import upImg from './upload.svg'
import DeafultButton from './DeafultButton';
import Loading from './loading';
import axios from 'axios';
import {saveAs} from './FileSaver';
class UploadImage extends React.Component {
  constructor() {
    super()
    this.state = {
               file: {},
               loading: false 
              }
    this.onClick = this.onClick.bind(this)
  }

  onDrop(file) {
    if(Object.keys(this.state.file).length > 0){
      window.URL.revokeObjectURL(this.state.file.preview);
    }
    this.setState({
      file: file[0]
    });
  }

  onClick(){
    this.setState({loading:true})
    let {file} = this.state
    axios({
      method: 'get',
      url: file.preview,
      responseType: 'blob'
    }).then((response)=>{
      saveAs(response, './image.jpeg')
    }).catch((err)=>{
      console.log(err)
    })
    // axios({
    //   method: 'post',
    //   url: 'https://localhost:5000/serverLiveCheck',
    //   data: {
    //     preview: file.preview
    //   }
    // }).then((response) => {
    //   console.log(response.data);
    // }).catch((err)=>{
    //   console.log(err)
    // })
  }

  render() {
    console.log(this.state.file)
    let  { file, loading } =  this.state
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} 
              style={{
                position: 'relative',
                textAlign: 'center',
                margin: 'auto',
                width: '40%',
                height: '200px',
                borderWidth: '2px',
                borderColor: 'rgb(102, 102, 102)',
                borderStyle: 'dashed',
                borderRadius: '5px'
              }}
          >
              <h2>Click or drag file to this area for upload</h2>
              <br/>
              <img src={upImg} alt="Upload Image" style={{width:'100px',height:'100px'}}/>
          </Dropzone>
        </div>
        <br/><br/>
        <aside style={{textAlign: 'center'}}>
          { Object.keys(file).length>0 ? 
            (<div>
              <p style={{fontSize:'20px'}}>Dropped file: {file.name} - {file.size} bytes</p>
              <img src={file.preview} alt={file.name} style={{border:'1px solid black',width:"20%"}}/>
              <br/>
            { !loading ?(<DeafultButton onClick={this.onClick} />) :(<Loading ><p><br/>Be Patient! <br/>We Are checking</p></Loading>)}
              </div>):
            (<p style={{fontSize:'20px'}}>Dropped file: None </p>)}  
        </aside>
      </section>
    );
  }
}

export default UploadImage;