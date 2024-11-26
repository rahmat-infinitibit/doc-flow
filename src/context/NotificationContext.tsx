import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'document' | 'system' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

interface NotificationState {
  notifications: Notification[];
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'DELETE_NOTIFICATION'; payload: string }
  | { type: 'DELETE_ALL_NOTIFICATIONS' };

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  deleteAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      title: 'New RFP Assignment',
      message: 'You have been assigned as the creator for RFP-2024-001',
      type: 'document',
      timestamp: '2024-03-15T10:30:00Z',
      read: false,
      actionUrl: '/document-parsing/RFP-2024-001'
    },
    {
      id: '2',
      title: 'Document Validation Complete',
      message: 'Validation completed for "Enterprise Software Proposal". No issues found.',
      type: 'success',
      timestamp: '2024-03-15T09:15:00Z',
      read: true,
      actionUrl: '/document-validation/ESW-2024-002'
    },
  ]
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      return {
        ...state,
        notifications: [newNotification, ...state.notifications]
      };

    case 'MARK_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };

    case 'MARK_ALL_AS_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      };

    case 'DELETE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };

    case 'DELETE_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      };

    default:
      return state;
  }
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  }, []);

  const markAsRead = useCallback((id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  }, []);

  const markAllAsRead = useCallback(() => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  }, []);

  const deleteNotification = useCallback((id: string) => {
    dispatch({ type: 'DELETE_NOTIFICATION', payload: id });
  }, []);

  const deleteAllNotifications = useCallback(() => {
    dispatch({ type: 'DELETE_ALL_NOTIFICATIONS' });
  }, []);

  const unreadCount = state.notifications.filter(n => !n.read).length;

  const value = {
    notifications: state.notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
