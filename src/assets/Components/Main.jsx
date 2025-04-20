import React, { useState } from 'react';
import ImageLogo from '../images/user.png';
import { useQuery } from '@tanstack/react-query';

const fetchUser = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error('User not found');
  return res.json();
};

const fetchRepos = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error('Repos not found');
  return res.json();
};

const Main = () => {
  const [username, setUsername] = useState('');
  const [searchUser, setSearchUser] = useState('');

  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['user', searchUser],
    queryFn: () => fetchUser(searchUser),
    enabled: !!searchUser,
  });

  const { data: repos = [], isLoading: isRepoLoading, error: repoError } = useQuery({
    queryKey: ['repos', searchUser],
    queryFn: () => fetchRepos(searchUser),
    enabled: !!searchUser,
  });

  const handleSearch = () => {
    if (username.trim()) {
      setSearchUser(username.trim());
    }
  };

  const [sortedRepos, setSortedRepos] = useState([]);

  const handleSort = (key) => {
    if (!repos.length) return;
    const sorted = [...repos].sort((a, b) => {
      if (key === 'name') return a.name.localeCompare(b.name);
      if (key === 'stars') return b.stargazers_count - a.stargazers_count;
      if (key === 'date') return new Date(b.created_at) - new Date(a.created_at);
      return 0;
    });
    setSortedRepos(sorted);
  };

  const finalRepos = sortedRepos.length ? sortedRepos : repos;

  return (
    <div className="main">
      <div className="container">
        <div className="main_search">
          <input
            type="text"
            placeholder="Введите имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="searchbtn" onClick={handleSearch}>
            НАЙТИ
          </button>
        </div>

        {isUserLoading && <p>Загрузка пользователя...</p>}
        {userError && <p style={{ color: 'red' }}>Пользователь не найден</p>}
        {userData && (
          <div className="main_user">
            <div className="main_user_card">
              <div className="main_user_card_left">
                <img src={userData.avatar_url || ImageLogo} alt="Avatar" />
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                  <button className="main_user_card_button">ПОСЕТИТЬ</button>
                </a>
              </div>
              <div className="main_user_card_right">
                <h4 className="main_user_card_title"><span>{userData.name || 'USERNAME'}</span></h4>
                <h4 className="main_user_card_title"><span>Репозиториев: </span>{userData.public_repos}</h4>
                <h4 className="main_user_card_title"><span>Создан: </span>{new Date(userData.created_at).toLocaleDateString()}</h4>
                <h4 className="main_user_card_title"><span>Подписчиков: </span>{userData.followers}</h4>
                <h4 className="main_user_card_title"><span>Подписок: </span>{userData.following}</h4>
              </div>
            </div>
          </div>
        )}

        {finalRepos.length > 0 && (
          <>
            <div className="main_sort">
              <h3 className="main_sort_title">Сортировка</h3>
              <div className="main_sort_list">
                <button className="main_sort_list_title" onClick={() => handleSort('name')}>ИМЯ</button>
                <button className="main_sort_list_title" onClick={() => handleSort('stars')}>ЗВЕЗДЫ</button>
                <button className="main_sort_list_title" onClick={() => handleSort('date')}>ДАТА</button>
              </div>
            </div>

            <div className="main_repos">
              {finalRepos.map((repo) => (
                <div className="main_repos_card" key={repo.id}>
                  <h3 className="main_repos_card_title">{repo.name}</h3>
                  <p className="main_repos_card_stars">Кол-во звёзд: {repo.stargazers_count}</p>
                  <p className="main_repos_card_data">Дата добавления: {new Date(repo.created_at).toLocaleDateString()}</p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <button className="main_repos_card_button">ПОСЕТИТЬ</button>
                  </a>
                </div>
              ))}
            </div>
          </>
        )}

        {isRepoLoading && <p>Загрузка репозиториев...</p>}
        {repoError && <p style={{ color: 'red' }}>Не удалось загрузить репозитории</p>}
      </div>
    </div>
  );
};

export default Main;
