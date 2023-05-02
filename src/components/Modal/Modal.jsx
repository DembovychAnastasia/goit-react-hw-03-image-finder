import { Component } from "react";
import { createPortal } from 'react-dom';
import PropTypes from "prop-types"
import { StyleModal, Overlay } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    image:PropTypes.object.isRequired,
    onClose:PropTypes.func.isRequired,
  }
    componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
  }
  onKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose()
    }
  }
   onOverlay = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose()
    }
  }
  render() {
    const { image } = this.props;
    return createPortal(
   <Overlay onClick={this.onOverlay}>
  <StyleModal>
    <img src={image.largeUrl} alt={image.targetAlt} />
  </StyleModal>
      </Overlay>,
      document.querySelector('#modalRoot')
    )
 }
}
