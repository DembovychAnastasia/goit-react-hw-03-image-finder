import { Triangle } from 'react-loader-spinner';

export const Loader = () => {
    return (
      <Triangle
        visible={true}
        height="80"
        width="80"
        color= "#696969"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          display: 'block',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
}