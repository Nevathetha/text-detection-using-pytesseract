import React, {Component} from 'react';
import  { post } from 'axios';
import './App.css';
import TextItem from './response';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      file:null,
      text:[{}]
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  onFormSubmit(e){
    e.preventDefault()
    this.fileUpload(this.state.file).then((response)=>{
      console.log("response", response);
      this.setState({text: response.data});
    })
  }

  onChange(e) {
    this.setState({file:e.target.files[0]})
  }

  fileUpload(file){
    const url = 'http://localhost:5000/file-upload';
    const formData = new FormData();
    formData.append('files',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render (){
    return (
      <div className="App">
        <div class="jumbotron jumbotron-fluid text-center text-white">
          <div class="container">
            <h1 class="display-4 text-justify">Text Detection using PyTesseract</h1>
            <p class="lead text-justify">You can upload your image file here to get the text.</p>
          </div>
        </div>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div id="dropzone">
            <form className="dropzone needsclick" enctype="multipart/form-data" onSubmit={this.onFormSubmit} id="demo">
              <div className="fallback">
              <label for="upload">
                <span className="glyphicon glyphicon-folder-open" aria-hidden="true"></span>
                <input type="file" name="file" id="upload" onChange={this.onChange} />
                </label>
                <div className="dz-message needsclick">
                  <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                  </div>
                  
                  <h4>Drop files here or click to upload.</h4>
                </div>
              </div>
              <button className="fadeIn fourth btn btn-secondary" >Send File</button>
              
            </form>
            </div>
              <div id="formFooter">
              <TextItem text={this.state.text} />
              </div>
          </div>
        </div>
              
      </div>
    );
  }
}
