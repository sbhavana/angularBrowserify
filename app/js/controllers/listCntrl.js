'use strict';

//var lib = require ('lib');

module.exports = function ( $scope, socket ) {

    var Cntrl = {};
    $scope.Cntrl = Cntrl;

    // get users list from the server
    socket.emit ( 'getAllUsers', function ( err, data ) {

        if ( err ) {

            console.log ( err );
        }

        else {

            //console.log ( "lib: ", lib );
            console.log ( "getAllUsers callback: ", data );

            Cntrl.users = data;

            socket.on ( 'userDeleted', function ( data ) {

                console.log ( "userDeleted: ", data );

                // update $scope.users
                Cntrl.users = window._.filter ( Cntrl.users, function ( user ) {

                    return user._id !== data._id;
                });
            });

            socket.on ( 'newUserAdded', function ( data ) {

                console.log ( "newUserAdded: ", data );

                // update $scope.users
                Cntrl.users.push ( data );
            });

            socket.on ( 'userUpdated', function ( data ) {

                console.log ( "userUpdated: ", data );

                // update $scope.users
                var ix = window._.findIndex ( Cntrl.users, function ( user ) {

                    return user._id === data._id;
                });

                if ( ix === -1 ) {

                    Cntrl.users [ Cntrl.users.length ] = data;
                }

                else {

                    Cntrl.users [ ix ] = data;
                }
            });

            $scope.$on ( '$destroy', function () {

                socket.removeListener ( 'newUserAdded' );
                socket.removeListener ( 'userUpdated' );
                socket.removeListener ( 'userDeleted' );
            })
        }
    });
};
