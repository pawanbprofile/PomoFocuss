import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {getItem, saveItem} from '../Storage/AsyncStore';
import Constants from '../Storage/Constants';
import {
  DEFAULT_BREAK,
  DEFAULT_SESSION,
  DEFAULT_LONG_BREAK,
  MAX_PERIOD,
  MIN_BREAK,
  MIN_LONG_BREAK,
  MIN_SESSION,
} from '../Storage/Constants';

export enum SESSIONTYPE {
  SESSION = 0,
  BREAK,
  LONGBREAK,
}

type SessionContextType = {
  sessionTime: number;
  breakTime: number;
  longBreakTime: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  increaseTime: (type: SESSIONTYPE) => void;
  decreaseTime: (type: SESSIONTYPE) => void;
  resetTime: (type: SESSIONTYPE) => void;
  toggleAutoStartBreaks: (value: boolean) => void;
  toggleAutoStartPomodoros: (value: boolean) => void;
};

// const defaultSessionContext: SessionContext = {
//   sessionTime: DEFAULT_SESSION,
//   breakTime: DEFAULT_BREAK,
//   longBreakTime: DEFAULT_LONG_BREAK,
//   increaseTime: (type: SESSIONTYPE) => {},
//   decreaseTime: (type: SESSIONTYPE) => {},
//   resetTime: (type: SESSIONTYPE) => {},
// };
export const SessionContext = createContext<SessionContextType | undefined>(
  undefined,
);
type SessionContextProviderProps = {
  children: ReactNode;
};
export const SessionContextProvider = ({
  children,
}: SessionContextProviderProps) => {
  const [sessionTime, setSessionTime] = useState<number>(DEFAULT_SESSION);
  const [breakTime, setBreakTime] = useState<number>(DEFAULT_BREAK);
  const [longBreakTime, setLongBreakTime] =
    useState<number>(DEFAULT_LONG_BREAK);
  const [autoStartBreaks, setAutoStartBreaks] = useState<boolean>(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState<boolean>(false);

  const updateAutoBreaks = async () => {
    const result = await getItem(Constants.SAVE_AUTO_BREAKS);
    setAutoStartBreaks(result ? true : false);
  };

  const updateAutoPomodoros = async () => {
    const result = await getItem(Constants.SAVE_AUTO_POMODOROS);
    setAutoStartPomodoros(result ? true : false);
  };

  const updateSessionTime = async () => {
    try {
      const result = await getItem(Constants.SESSION_TIME);
      setSessionTime(result ? result : DEFAULT_SESSION);
    } catch (error) {
      throw new Error('Error fetching session time from storage');
    }
  };

  const updateBreakTime = async () => {
    try {
      const result = await getItem(Constants.BREAK_TIME);
      setBreakTime(result ? result : DEFAULT_BREAK);
    } catch (error) {
      throw new Error('Error fetching break time from storage');
    }
  };

  const updateLongBreak = async () => {
    try {
      const result = await getItem(Constants.LONG_BREAK_TIME);
      setLongBreakTime(result ? result : DEFAULT_LONG_BREAK);
    } catch (error) {
      throw new Error('Error fetching long break from storage');
    }
  };
  useEffect(() => {
    updateAutoBreaks();
    updateAutoPomodoros();
    updateSessionTime();
    updateBreakTime();
    updateLongBreak();
  }, [autoStartBreaks, autoStartPomodoros]);

  const increaseTime = (type: SESSIONTYPE) => {
    switch (type) {
      case SESSIONTYPE.SESSION: {
        setSessionTime(prev => {
          if (prev < MAX_PERIOD) {
            saveItem(Constants.SESSION_TIME, prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
      case SESSIONTYPE.BREAK: {
        setBreakTime(prev => {
          if (prev < MAX_PERIOD) {
            saveItem(Constants.BREAK_TIME, prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
      case SESSIONTYPE.LONGBREAK: {
        setLongBreakTime(prev => {
          if (prev < MAX_PERIOD) {
            saveItem(Constants.LONG_BREAK_TIME, prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
      default: {
        setSessionTime(prev => {
          if (prev < MAX_PERIOD) {
            saveItem(Constants.SESSION_TIME, prev + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      }
    }
  };

  const decreaseTime = (type: SESSIONTYPE) => {
    switch (type) {
      case SESSIONTYPE.SESSION:
        setSessionTime(prev => {
          if (prev > MIN_SESSION) {
            saveItem(Constants.SESSION_TIME, prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;

      case SESSIONTYPE.BREAK: {
        setBreakTime(prev => {
          if (prev > MIN_BREAK) {
            saveItem(Constants.BREAK_TIME, prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      }
      case SESSIONTYPE.LONGBREAK: {
        setLongBreakTime(prev => {
          if (prev > MIN_LONG_BREAK) {
            saveItem(Constants.LONG_BREAK_TIME, prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      }
      default: {
        setSessionTime(prev => {
          if (prev > MIN_SESSION) {
            saveItem(Constants.SESSION_TIME, prev - 1);
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      }
    }
  };
  const resetTime = (type: SESSIONTYPE) => {
    switch (type) {
      case SESSIONTYPE.SESSION: {
        setSessionTime(DEFAULT_SESSION);
        saveItem(Constants.SESSION_TIME, DEFAULT_SESSION);
        break;
      }
      case SESSIONTYPE.BREAK: {
        setBreakTime(DEFAULT_BREAK);
        saveItem(Constants.BREAK_TIME, DEFAULT_BREAK);
        break;
      }
      case SESSIONTYPE.LONGBREAK: {
        setLongBreakTime(DEFAULT_LONG_BREAK);
        saveItem(Constants.LONG_BREAK_TIME, DEFAULT_LONG_BREAK);
        break;
      }
      default: {
        setSessionTime(DEFAULT_SESSION);
        saveItem(Constants.SESSION_TIME, DEFAULT_SESSION);
        break;
      }
    }
  };

  const toggleAutoStartBreaks = (val: boolean) => {
    setAutoStartBreaks(val);
    saveItem(Constants.SAVE_AUTO_BREAKS, val);
  };

  const toggleAutoStartPomodoros = (val: boolean) => {
    setAutoStartPomodoros(val);
    saveItem(Constants.SAVE_AUTO_POMODOROS, val);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionTime: sessionTime,
        breakTime: breakTime,
        longBreakTime: longBreakTime,
        increaseTime,
        decreaseTime,
        resetTime,
        autoStartBreaks,
        autoStartPomodoros,
        toggleAutoStartBreaks,
        toggleAutoStartPomodoros,
      }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const sessionContex = useContext(SessionContext);
  if (sessionContex === undefined) {
    throw new Error('useSession must be used with in SessionContextProvider');
  }
  return sessionContex;
};
