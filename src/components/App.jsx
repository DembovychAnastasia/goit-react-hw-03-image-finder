import { Component } from 'react';
import { GlobalStyle } from "./GlobalStyle";
import  toast, { Toaster } from 'react-hot-toast';
import { AppStyled } from './App.styled';
import { SearchBar } from './SearchBar/SearchBar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './imageApi';
import {Loader} from './Loader/Loader'
import { Modal } from './Modal/Modal';
// import { Instance } from 'modal';
// import {ImageGalleryNew} from './ImageGallery/ImageGallery'

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    totalHits: 0,
    showModal: false,
    activeImage: null,
  };


  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      fetchImages(query, page)
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

  submitHandler = query => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    this.setState({
      query,
      images: [],
      page: 1,
      totalHits: 0,
    });
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
    // const { query} = this.state;
    return (
      <AppStyled>
        <SearchBar onSubmit={this.submitHandler} />
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
       

{/* <Instance/> */}
      </AppStyled>
    );
  }
}

