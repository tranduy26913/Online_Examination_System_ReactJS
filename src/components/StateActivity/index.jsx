import { firestore, database, messaging } from 'config/firebaseConfig'
import { collection, addDoc } from '@firebase/firestore'
import { ref, onValue, onDisconnect, set } from 'firebase/database'
import { onMessage, getToken } from 'firebase/messaging'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import apiProfile from 'apis/apiProfile'
export default function StateActivity() {
    const user = useSelector(state => state.user.info)
    const [id, setId] = useState(user?._id || '')

    useEffect(() => {
        let isOfflineForDatabase = {
            state: 'offline',
            last_changed: new Date().getTime(),
        };

        let isOnlineForDatabase = {
            state: 'online',
            last_changed: new Date().getTime(),
        };

        if (user) {
            let userStatusDatabaseRef = ref(database, '/status/' + user._id);
            setId(user._id)

            const connectedRef = ref(database, '.info/connected')
            onValue(connectedRef, (snapshot) => {
                // If we're not currently connected, don't do anything.
                if (snapshot.val() == false) {
                    return;
                };
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(function () {
                    set(userStatusDatabaseRef, isOnlineForDatabase);
                });
            });
            // onMessage(messaging, (payload) => {
            //     if (!payload?.notification) {

            //         return;
            //     }
            //     const { notification } = payload
            //     toast.success(notification.title)
            // })
            // Notification.requestPermission().then(() =>
            //     getToken(messaging)
            // )
            //     .then(token => {
            //         console.log(token)
            //         apiProfile.updateDeviceToken({ deviceToken: token })
            //             .then(response => {
            //                 console.log(response)
            //             })

            //     }).catch(err => {
            //         console.log(err)
            //     })

        }
        else {
            if (id) {
                let userStatusDatabaseRef = ref(database, '/status/' + id);
                set(userStatusDatabaseRef, isOfflineForDatabase);
                setId('')
            }
        }
    }, [user])



    return (<>
    </>)
}
