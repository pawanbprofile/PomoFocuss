import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import Colors from '../Utils/Colors';
import {getItem, saveItem} from '../Storage/AsyncStore';
import Constants from '../Storage/Constants';

type ApplicationContextProviderProps = {
  children: ReactNode;
};

export enum AppTheme {
  COFFEE,
  TOMATO,
  SHADOW,
}

type Theme = {
  id: AppTheme;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
  buttonColor: string;
  barStyle: string;
};

const CoffeeTheme: Theme = {
  id: AppTheme.COFFEE,
  backgroundColor: Colors.Backgorunds.Coffee,
  textColor: Colors.Fonts.Shadow,
  iconColor: Colors.Icons.Shadow,
  borderColor: Colors.Backgorunds.Shadow,
  buttonColor: Colors.Backgorunds.Shadow,
  barStyle: 'dark-content',
};

const TomatoTheme: Theme = {
  id: AppTheme.TOMATO,
  backgroundColor: Colors.Backgorunds.Tomato,
  textColor: Colors.Fonts.Coffee,
  iconColor: Colors.Icons.Coffee,
  borderColor: Colors.Backgorunds.Coffee,
  buttonColor: Colors.Backgorunds.Coffee,
  barStyle: 'light-content',
};

const ShadowTheme: Theme = {
  id: AppTheme.SHADOW,
  backgroundColor: Colors.Backgorunds.Shadow,
  textColor: Colors.Fonts.Coffee,
  iconColor: Colors.Icons.Coffee,
  borderColor: Colors.Backgorunds.Coffee,
  buttonColor: Colors.Backgorunds.Coffee,
  barStyle: 'light-content',
};

type ApplicationContext = {
  appTheme: Theme;
  vibrate: boolean;
  updateAppTheme: (id: AppTheme) => void;
  toggleVibrate: (val: boolean) => void;
};

export const ApplicationContext = createContext<ApplicationContext | undefined>(
  undefined,
);

export const ApplicationContextProvider = ({
  children,
}: ApplicationContextProviderProps) => {
  const [appTheme, setAppTheme] = useState<Theme>(TomatoTheme);
  const [vibrate, setVibrate] = useState<boolean>(false);

  const toggleVibrate = (value: boolean) => {
    setVibrate(value);
    console.log('toggleVibrate ', value);
  };

  const updateAppThemFromStorage = async () => {
    try {
      const isVibrate = await getItem(Constants.VIBRATE);
      setVibrate(isVibrate ? true : false);
      const result = await getItem(Constants.APP_THEME);
      if (result) {
        switch (result) {
          case AppTheme.COFFEE: {
            setAppTheme(CoffeeTheme);
            break;
          }
          case AppTheme.TOMATO: {
            setAppTheme(TomatoTheme);
            break;
          }
          case AppTheme.SHADOW: {
            setAppTheme(ShadowTheme);
            break;
          }
          default: {
            setAppTheme(TomatoTheme);
            break;
          }
        }
      } else {
        setAppTheme(TomatoTheme);
      }
    } catch (error) {
      throw new Error('Error fetching app theme from storage');
    }
  };
  useEffect(() => {
    updateAppThemFromStorage();
  }, []);

  const updateAppTheme = (val: AppTheme) => {
    switch (val) {
      case AppTheme.COFFEE: {
        setAppTheme(CoffeeTheme);
        saveItem(Constants.APP_THEME, CoffeeTheme.id);
        break;
      }
      case AppTheme.SHADOW: {
        setAppTheme(ShadowTheme);
        saveItem(Constants.APP_THEME, ShadowTheme.id);
        break;
      }
      case AppTheme.TOMATO: {
        setAppTheme(TomatoTheme);
        saveItem(Constants.APP_THEME, TomatoTheme.id);
        break;
      }
      default: {
        setAppTheme(TomatoTheme);
        saveItem(Constants.APP_THEME, TomatoTheme.id);
        break;
      }
    }
  };
  return (
    <ApplicationContext.Provider
      value={{appTheme, updateAppTheme, vibrate, toggleVibrate}}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const applicationContext = useContext(ApplicationContext);
  if (applicationContext === undefined) {
    throw new Error(
      'useApplication context must be used in ApplicationContextProvider',
    );
  }

  return applicationContext;
};
