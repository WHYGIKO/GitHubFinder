import React from 'react'
import ImageLogo from '../images/user.png'

const Main = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="main_search">
                    <input type="text" placeholder='Введите имя пользователя' />
                    <button className='searchbtn'>НАЙТИ</button>
                </div>
                <div className="main_user">
                    <div className="main_user_card">
                    <div className="main_user_card_left">
                        <img src={ImageLogo} alt="" />
                        <button className="main_user_card_button">
                            ПОСЕТИТЬ
                        </button>
                    </div>
                    <div className="main_user_card_right">

                        <h4 className='main_user_card_title'><span>USERNAME</span></h4>
                        <h4 className='main_user_card_title'><span>Репозиториев: </span>1</h4>
                        <h4 className='main_user_card_title'><span>Создан: </span>2020-01-20</h4>
                        <h4 className='main_user_card_title'><span>Подписщиков: </span>1</h4>
                        <h4 className='main_user_card_title'><span>Подписок: </span>2</h4>
                    </div>
                    </div>
                </div>
                <div className="main_sort">
                    <h3 className="main_sort_title">Сортировка</h3>
                    <div className="main_sort_list">
                    <button className="main_sort_list_title">ИМЯ</button>
                    <button className="main_sort_list_title">ЗВЕЗДЫ</button>
                    <button className="main_sort_list_title">ДАТА</button>
                    </div>
                </div>
            <div className="main_repos">
                <div className="main_repos_card">
                    <h3 className="main_repos_card_title">
                        VUE
                    </h3>
                    <p className="main_repos_card_stars">Кол-во звёзд: 0</p>
                    <p className="main_repos_card_data">Дата добавления: 2022-05-30</p>
                </div>
                <button className="main_repos_card_button">
                ПОСЕТИТЬ
                </button>
            </div>
            </div>
        </div>
    )
}

export default Main
