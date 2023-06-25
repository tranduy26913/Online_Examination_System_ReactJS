import {  database } from 'config/firebaseConfig'
import { ref, onValue, onDisconnect, set } from 'firebase/database'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
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
                if (snapshot.val() === false) {
                    return;
                };
                onDisconnect(userStatusDatabaseRef).set(isOfflineForDatabase).then(function () {
                    set(userStatusDatabaseRef, isOnlineForDatabase);
                });
            });

        }
        else {
            if (id) {
                let userStatusDatabaseRef = ref(database, '/status/' + id);
                set(userStatusDatabaseRef, isOfflineForDatabase);
                setId('')
            }
        }
    }, [user,id])



    return (<>
    </>)
}
