type EndpointGroup = 'artists' | 'playlists' | 'tracks' | 'users' | 'comments';

export interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
}

/**
 * Configuration object containing all available API endpoints grouped by entity type.
 * Each endpoint defines its HTTP method, path, and description.
 */
export const endpoints: Record<EndpointGroup, Endpoint[]> = {
  artists: [
    { method: 'GET', path: '/artists', description: 'Get all artists' },
    {
      method: 'GET',
      path: '/artists/:artistId',
      description: 'Get artist by ID',
    },
    {
      method: 'POST',
      path: '/artists/create-artist',
      description: 'Create a new artist',
    },
    {
      method: 'PATCH',
      path: '/artists/patch-artist/:artistId',
      description: 'Patch artist',
    },
    { method: 'DELETE', path: '/artists/:id', description: 'Delete artist' },
  ],
  playlists: [
    { method: 'GET', path: '/playlists', description: 'Get all playlists' },
    { method: 'GET', path: '/playlists/albums', description: 'Get all albums' },
    {
      method: 'GET',
      path: '/playlists/albums/:artistId',
      description: 'Get all albums by artistId',
    },
    {
      method: 'GET',
      path: '/playlists/:playlistId',
      description: 'Get playlist by ID',
    },
    {
      method: 'GET',
      path: '/playlists/tracks/:playlistId',
      description: 'Get playlist tracks by ID',
    },
    {
      method: 'POST',
      path: '/playlists/create',
      description: 'Create a new playlist',
    },
    {
      method: 'PATCH',
      path: '/playlists/add-track-to-album/:playlistId',
      description: 'Add track to album by ID',
    },
    {
      method: 'PATCH',
      path: '/playlists/add-track-to-playlist/:playlistId',
      description: 'Add track to playlist by ID',
    },
    {
      method: 'PATCH',
      path: '/playlists/edit-header/:playlistId',
      description: 'Edit header of playlist by ID',
    },
    {
      method: 'PATCH',
      path: '/playlists/edit-tracks/:playlistId',
      description: 'Edit tracks of playlist by ID',
    },
    {
      method: 'DELETE',
      path: '/playlists/:playlistId',
      description: 'Delete playlist by ID',
    },
  ],
  tracks: [
    { method: 'GET', path: '/tracks', description: 'Get all tracks' },
    {
      method: 'GET',
      path: '/tracks/by-artist/:artistId',
      description: 'Get all tracks by artist',
    },
    {
      method: 'GET',
      path: '/tracks/by-album/:albumId',
      description: 'Get all tracks from album',
    },
    { method: 'GET', path: '/tracks/:trackId', description: 'Get track by ID' },
    {
      method: 'POST',
      path: '/tracks/upload',
      description: 'Upload a new track',
    },
    {
      method: 'POST',
      path: '/tracks/comment',
      description: 'Add comment to a track',
    },
    { method: 'PATCH', path: '/tracks/:trackId', description: 'Patch track' },
    {
      method: 'DELETE',
      path: '/tracks/:trackId',
      description: 'Delete track by Id',
    },
    {
      method: 'DELETE',
      path: '/tracks/delete-all',
      description: 'Delete all tracks',
    },
  ],
  users: [
    { method: 'GET', path: '/users', description: 'Get all users' },
    { method: 'POST', path: '/users', description: 'Create a new user' },
    { method: 'GET', path: '/users/:userId', description: 'Get user by ID' },
    { method: 'DELETE', path: '/users/:userId', description: 'Delete user' },
  ],
  comments: [
    { method: 'GET', path: '/comments', description: 'Get all comments' },
    { method: 'POST', path: '/comments', description: 'Create a new comment' },
    { method: 'GET', path: '/comments/:id', description: 'Get comment by ID' },
    { method: 'PATCH', path: '/comments/:id', description: 'Update comment' },
    { method: 'DELETE', path: '/comments/:id', description: 'Delete comment' },
  ],
};
