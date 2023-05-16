



import React from 'react'


export const mainContext: any = React.createContext(null)

const Provider = mainContext.Provider

function MainContext({
    children
}: {
    children: React.ReactElement
}) {







    return (
        <Provider value={[]}>
            {children}
        </Provider>
    )
}

export default MainContext
