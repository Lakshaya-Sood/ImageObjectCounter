import React from 'react';
import Dropzone from 'react-dropzone';
import upImg from './upload.svg';
import hand_icon from './hand_icon.svg';
import DeafultButton from './DeafultButton';
import Loading from './loading';
import axios from 'axios';

class UploadImage extends React.Component {
  constructor() {
    super()
    this.state = {
               file: {},
               loading: false,
               checkImageStatus: false,
               afterUpload: false,
               dropDisabled: false,
               result:false,
               response:[]
              }
    this.onClick = this.onClick.bind(this)
    this.reset = this.reset.bind(this)
    this.clearBlobUrl = this.clearBlobUrl.bind(this)
  }

  clearBlobUrl(){
    if(Object.keys(this.state.file).length > 0){
      window.URL.revokeObjectURL(this.state.file.preview);
    }
  }
  componentWillUnmount(){
    this.clearBlobUrl();
  }

  reset(){
    this.clearBlobUrl();
    this.setState({
      file: {},
      loading: false,
      checkImageStatus: false,
      afterUpload: false,
      dropDisabled: false,
      result:false,
      response:[]
     })
  }

  onDrop(file) {
    this.clearBlobUrl();
    this.setState({
      file: file[0]
    });
  }

  onClick(){
    this.setState({loading:true,dropDisabled:true})
    let self = this;
    let { file } = this.state
    axios({
      method: 'get',
      url: file.preview, 
      responseType: 'blob'
      }).then((response) => {
          var reader = new FileReader();
          reader.readAsDataURL(response.data);
          reader.onloadend = function() {
              let base64data = reader.result,
                string64 = base64data.split(',')[1]
              axios({
                method: 'post',
                url:'http://localhost:5000/serverLiveCheck',
                data: { image: string64, name: file.name }
              }).then((response)=>{
                console.log(response)
                let temp = response.data.length>0?response.data:[{itemName:'None',count:0}]
                self.setState({afterUpload:true,checkImageStatus:true,response:temp,result:true})
              }).catch((err)=>{
                self.setState({afterUpload:true,checkImageStatus:false})
                console.log(err)
              })
          }  
              
          })
        .catch((err)=>{
          console.log(err)
        })
  }

  render() {
    let  { file, loading, afterUpload, checkImageStatus, dropDisabled, result, response } =  this.state
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} 
              disabled={dropDisabled}
              style={{
                position: 'relative',
                textAlign: 'center',
                margin: 'auto',
                width: '40%',
                height: '200px',
                borderWidth: '2px',
                borderColor: dropDisabled ? 'grey' :'rgb(102, 102, 102)',
                color: dropDisabled ? 'grey' :'black',
                borderStyle: 'dashed',
                borderRadius: '5px'
              }}
          >
              <h2>Click or drag image to this area for upload</h2>
              <br/>
              <img src={dropDisabled ? hand_icon : upImg} alt="Upload Image" style={{width:'100px',height:'100px'}}/>
          </Dropzone>
        </div>
        <br/><br/>
        <aside style={{textAlign: 'center'}}>
          { Object.keys(file).length>0 ? 
            (<div>
              <p style={{fontSize:'20px'}}>Dropped file: {file.name} - {file.size} bytes</p>
              <img src={file.preview} alt={file.name} style={{border:'1px solid black',width:"20%"}}/>
              <br/>
            { afterUpload ? (checkImageStatus?<p>Success!<DeafultButton onClick={this.reset} text={'Reset'}/></p>:<p>Failure!<DeafultButton onClick={this.reset} text={'Reset'}/></p>):
              !loading ?(<DeafultButton onClick={this.onClick} text={'Check Image'}/>) :(<Loading ><p><br/>Be Patient! <br/>We Are checking</p></Loading>)}
              </div>):
            (<p style={{fontSize:'20px'}}>Dropped file: None </p>)} 
        </aside>
        { result ? (<div style={{textAlign: 'center'}}> 
          <h2>Result</h2>
          <table style={{textAlign: 'center',border:'2px solid black'}}>
            <tr>
              <th>Product</th>
              <th>Count</th>
            </tr>
            {response.map((item)=>{
              return(<tr>
                <td>{item.itemName}</td>
                <td>{item.count}</td>
              </tr>)
            })}
          </table>
        </div>):<div></div>}
      </section>
    );
  }
}

export default UploadImage;