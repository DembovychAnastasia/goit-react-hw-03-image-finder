import { Component } from 'react';
import { toast } from 'react-hot-toast';
import PropTypes from "prop-types"
import { Form, FormButton, Label, Input, Header} from './SearchBar.styled'
import { BsSearch} from "react-icons/bs"

export class SearchBar extends Component{

  static propTypes = {
    onSubmit:PropTypes.func.isRequired,
}


  state = { searchQuery: '' }
  onChange = event => {
    this.setState({ searchQuery: event.currentTarget.value})
   
   
  } 
  clearForm = () => {
    document.getElementById("myForm").reset(); 
    this.setState({
      searchQuery: ""
    })
  }

  onSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim()=== '') {
      return  (toast.error('please type something')
      )

    }
      this.props.onSubmit(this.state.searchQuery)
      this.setState({ searchQuery: ''})
      this.clearForm()
    
  
  }
  


  render() {
    return (
<Header>
        <Form onSubmit={this.onSubmit} id="myForm">
          
    <FormButton type="submit">
        <Label>Search</Label>
        <BsSearch size={20}/>
    </FormButton>
    <Input
      type="text"
      autoComplete="off"
      autoFocus
      placeholder="Search images and photos"
      onChange={this.onChange}
      
      />
          
  </Form>
</Header>
    )
  }
}



