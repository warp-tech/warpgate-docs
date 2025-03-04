You can issue tickets that grant a specific user access to a specific target, bypassing authorization. This is especially useful for non-interactive sessions where 2FA flows aren't possible, e.g. when connecting an application to a database or an API through Warpgate.

# Creating a ticket

In the admin UI, create a ticket in the _Tickets_ section, selecting a user account and a target:

<img width="500" src="https://github.com/user-attachments/assets/44cba253-1100-4dde-b80f-032290f9a32b">

Once the ticket is created, you'll see the protocol-specific connection instructions. In this case, for an HTTP target, the user can pass the ticket through a query parameter or an `Authorization` header:

<img width="500" alt="image" src="https://github.com/user-attachments/assets/9906f49a-9a16-4446-bab5-a771aa2303aa">


