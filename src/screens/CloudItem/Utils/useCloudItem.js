import {useAppSelector} from '../../../store/store';

export const useCloudItem = () => {
  const {movies, videos, images, audio, pdf, zip} = useAppSelector(
    state => state.firebase,
  );

  return {movies, videos, images, audio, pdf, zip};
};
