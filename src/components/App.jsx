import { Component } from 'react';
// import PropTypes from 'prop-types';
import { GlobalStyle } from "./GlobalStyle";
import  toast, { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../api/imageApi';
import {Loader} from './Loader/Loader'
import { Modal } from './Modal/Modal';



export class App extends Component {
  
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    totalHits: 0,
    showModal: false,
    activeImage: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if ((prevState.searchQuery !== searchQuery || prevState.page !== page)){
      this.setState({ isLoading: true });
      fetchImages(searchQuery, page)
        .then(({ hits, totalHits }) => {
          if (!totalHits) {
            console.log(totalHits, hits);
            toast.error('There are no images for your request');
            return;
          }
          const results = hits.map(
            ({ tags, id, webformatURL, largeImageURL }) => ({
              tags,
              id,
              smallImage: webformatURL,
              largeImage: largeImageURL,
            })
          );

          this.setState(({ images }) => {
            return { images: [...images, ...results], totalHits };
          });
        })
        .catch(error => {
          toast.error('There are no images for your request');
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }


  submitHandler = searchQuery => {
    if (searchQuery === this.state.searchQuery) {
      return (toast(' That was images for your request')) 
    }
    window.scrollTo({ behavior: 'smooth', top: 0 });
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      totalHits: 0,
    });

   
  
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  onLoadMoreButton = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  onImageClick = (activeImage = null) => {
    this.setState({ activeImage });
    
  };

  render() {
    const { isLoading, images, totalHits, activeImage } = this.state;

    return (
      <AppStyled>
        <SearchBar onSubmit={this.submitHandler}  onChange={this.handleChange}  value={this.state.value}/>
        <ImageGallery images={images} openModal={this.onImageClick} />
        {totalHits > images.length && !isLoading && (
          <Button onLoadMoreButton={this.onLoadMoreButton} />
        )}
        {isLoading && <Loader/>}
        {activeImage && (
          <Modal image={activeImage} onClose={this.onImageClick}></Modal>
        )}
        <Toaster position="top-center" reverseOrder={false}/>
        <GlobalStyle/>
       


      </AppStyled>
    );
  }
}

