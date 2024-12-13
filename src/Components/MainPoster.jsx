import React, { useEffect, useState } from 'react'
import '../Styles/MainPoster.css'
import { getAnimeById } from '../Database/getAnimeById.js'

export default function MainPoster() {
    const [loading, setLoading] = useState(true)
    const [mainAnime, setMainAnime] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const fetchMainAnime = async () => {
            setLoading(true)
            try {
                setMainAnime(await getAnimeById(11))
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMainAnime()
    }, [])

    if (loading) {
        return <div>Загрузка...</div>
    }

    const handleImageLoad = () => {
        setTimeout(() => {
            setImageLoaded(true)
        }, 200)
    }

    return (
        <div
            className={`main-anime-container container ${imageLoaded ? 'loaded' : ''}`}
        >
            <div className="image-container">
                <img
                    src={'/posters/' + mainAnime.image_url + '.jpg'}
                    alt=""
                    className="main-anime blurred"
                    onLoad={handleImageLoad}
                />

                <img
                    src={'/posters/' + mainAnime.image_url + '.jpg'}
                    alt=""
                    className="main-anime"
                />
            </div>

            <div className="content-container">
                <img
                    src={'/logos/' + mainAnime.image_url + '.png'}
                    alt="main-anime-logo"
                    className="main-anime-logo"
                />
            </div>
        </div>
    )
}
