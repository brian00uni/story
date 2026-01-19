import { createContext, useContext } from 'react';

export type HeaderProps = {
  pageTitle: string;
  backButton: boolean;
  closeButton: boolean;
  fnGoBack?: () => void;
};

export type SetHeaderProps = (props: Partial<HeaderProps>) => void;

const HeaderPropsContext = createContext<SetHeaderProps | null>(null);

export const HeaderPropsProvider = HeaderPropsContext.Provider;

export const useSetHeaderProps = () => {
  const setHeaderProps = useContext(HeaderPropsContext);
  return setHeaderProps ?? (() => {});
};
