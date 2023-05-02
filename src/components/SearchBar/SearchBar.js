import { Component } from 'react'
// import { toast } from 'react-toastify';
import { toast } from 'react-hot-toast';
import PropTypes from "prop-types"
import { Form, FormButton, Label, Input, Header} from './SearchBar.styled'
import { BsSearch} from "react-icons/bs"

export class SearchBar extends Component{

  static propTypes = {
    onSubmit:PropTypes.func.isRequired,
}

  state = { query: '' }
  onChange = event => {
    this.setState({ query: event.currentTarget.value})
  } 
  onSubmit = event => {
    event.preventDefault();

    if (!this.state.query.trim()) {
      return toast.error('please type something');
    }

      this.props.onSubmit(this.state.query)
  }
  render() {
    return (
<Header>
        <Form onSubmit={this.onSubmit}>
          
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



