import { useState, useEffect } from "react"
import * as Realm from "realm-web"
import RestaurantCard from "../components/RestaurantCard"

//initialize the realm app
const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID })
//home component
const Home = () => {
    const [ restaurants, setRestaurants ] = useState([])
    const [ loading, setLoading ] = useState(true)
    //log in user anonymously and fetch data
    useEffect(() => {
        async function getData () {
            //get user who logged in anonymously
            const user = await app.logIn(Realm.Credentials.anonymous())
            //get access to mongo collection using above/current user
            const client = app.currentUser.mongoClient('mongodb-atlas')
            //get restaurants
            const rests = await client.db('sample_restaurants').collection('restaurants').find({}).limit(10)
            //add the restaurants to the state
            setRestaurants(rests)
            setLoading(false)
        }
        if(loading){
            getData()
        }
        
    }, [loading])

    return (
        <div className="mt-3">
            {
                loading && (
                    <div className="text-center">
                        <Loading />
                    </div>
                )
            }
            {
                restaurants.map(restaurant => (
                    <RestaurantCard key = { restaurant._id } restaurant={restaurant}/ >
                ))
            }
        </div>
    )
}

export default Home
