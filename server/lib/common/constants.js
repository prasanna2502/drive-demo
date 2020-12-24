module.exports = {
  Cookies: {
    SessionIdCookieName: 'driveDemoSessionId'
  },
  CookieOptions: {
    SessionIdCookie: {
      path: '/',
      secure: false,
      expires: new Date(Date.now() + 8 * 3600000)
    }
  },
  DefaultHostName: 'local.drive-demo.com:3050',
  RedirectUri: '/after-login',
  GoogleConstants: {
    LoginScope: ['https://www.googleapis.com/auth/drive'],
    AccessType: 'offline',
    DriveFileFields: 'kind,nextPageToken,files(id,mimeType,name,description,starred,trashed,parents,version,webContentLink,webViewLink,iconLink,thumbnailLink,thumbnailVersion,viewedByMe,viewedByMeTime,createdTime,modifiedTime,modifiedByMeTime,modifiedByMe,sharedWithMeTime,sharingUser/*,owners,shared,ownedByMe,capabilities/*,permissions,contentHints,contentRestrictions,appProperties)',
    ProfileFields: 'user(displayName,photoLink,emailAddress),rootFolderId',
    PermissionsResource: 'permissions',
    OwnerPermission: 'owner',
    DefaultFileOrderby: 'folder,sharedWithMeTime desc,name asc',
    ErrorEnums: {
      "No refresh token is set.": { code: 401, message: 'Access Token is missing' },
      "No access, refresh token or API key is set.": { code: 401, message: 'Access Token is missing' }
    }
  },
  DefaultAdapter: 'google'
}
