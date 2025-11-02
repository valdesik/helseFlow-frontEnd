import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGetNotificationsQuery, useMarkNotificationAsReadMutation } from '../../store/api';
import Loader from '../../components/common/Loader';
import ErrorAlert from '../../components/common/ErrorAlert';
import { Link } from 'react-router-dom';

const NotificationsPage = () => {
  const { t } = useTranslation();
  const { data: notifications, error, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  if (isLoading) {
    return <Loader message={t('notificationsPage.loadingNotifications')} />;
  }

  if (error) {
    return <ErrorAlert message={t('notificationsPage.errorLoadingNotifications')} />;
  }

  const unreadNotifications = notifications?.filter(n => !n.read) || [];
  const readNotifications = notifications?.filter(n => n.read) || [];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('notificationsPage.title')}</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg">
        {notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {unreadNotifications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3 text-gray-800">{t('notificationsPage.unread')} ({unreadNotifications.length})</h2>
                <div className="space-y-3">
                  {unreadNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                      <div>
                        <p className="font-medium text-blue-800">{notification.message}</p>
                        <p className="text-sm text-blue-600 mt-1">{new Date(notification.date).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {notification.link && (
                          <Link to={notification.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            {t('notificationsPage.view')}
                          </Link>
                        )}
                        <button 
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                        >
                          {t('notificationsPage.markAsRead')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {readNotifications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mt-6 mb-3 text-gray-800">{t('notificationsPage.read')} ({readNotifications.length})</h2>
                <div className="space-y-3">
                  {readNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 opacity-75">
                      <div>
                        <p className="text-gray-700">{notification.message}</p>
                        <p className="text-sm text-gray-500 mt-1">{new Date(notification.date).toLocaleString()}</p>
                      </div>
                      {notification.link && (
                        <Link to={notification.link} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          {t('notificationsPage.view')}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-600">{t('notificationsPage.noNotifications')}</p>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
