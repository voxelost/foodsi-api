# endpoints found in decompiled apk v <!-- TODO: find the actual app version -->

this is the output of a raw string search performed in IDA, on a precompiled x86 .so file bundled in the .APK file

## v1
- .rodata:000000000005CB16	00000017	C	/v1/restaurant/password
- .rodata:0000000000065095	00000008	C	/v1/auth
- .rodata:000000000010301E	0000000A	C	/v1/orders
- .rodata:00000000000BDB21	00000011	C	/v1/orders/cancel
- .rodata:00000000000D1B72	00000012	C	/v1/orders/collect
- .rodata:00000000000DAEBC	00000019	C	/v1/orders/cancel_payment
- .rodata:00000000000C46D5	00000009	C	/v1/rates
- .rodata:00000000000F51E4	00000011	C	/v1/rates/reasons
<!-- - .rodata:00000000000F21D3	00000018	C	https://api.inpost.pl/v1 -->
- .rodata:00000000000F7B2D	00000015	C	/v1/facebook/callback
- .rodata:00000000000D342C	00000010	C	/v1/users/orders
- .rodata:000000000009686A	0000001B	C	/v1/users/add_to_favourites
- .rodata:00000000000FBA83	00000020	C	/v1/users/remove_from_favourites

## v2
- .rodata:000000000007646D	00000011	C	/v2/token/devices
- .rodata:000000000009C65D	0000000F	C	/v2/restaurants
- .rodata:00000000000C52A0	00000010	C	/v2/restaurants/
- .rodata:0000000000081843	0000001B	C	/v2/restaurants/coordinates
- .rodata:00000000000B9743	00000013	C	/v2/user/apple_auth
- .rodata:00000000000F057B	00000014	C	/v2/user/restaurants
- .rodata:00000000000CC9CD	0000001B	C	/v2/general_manager/sign_in
- .rodata:00000000000D2ACF	00000010	C	/v2/auth/sign_in
- .rodata:0000000000106DDF	00000016	C	/v2/restaurant/sign_in
- .rodata:000000000010BE5A	0000000B	C	/v2/devices
- .rodata:000000000009B5CF	0000000C	C	/v2/payments
- .rodata:00000000000C93E5	0000001B	C	/v2/payments/card/tokenized
- .rodata:00000000000FE486	00000019	C	/v2/payments/stored_cards
- .rodata:000000000010118C	00000015	C	/v2/payments/android$
- .rodata:0000000000112D5A	0000000D	C	/v2/payments/

## v3
- .rodata:000000000007B072	00000015	C	/api/v3/partner/oauth

note: there's also a dart package called api_client_v3, that may contain some other form of API communication (gRPC, websocket, etc.)
note: `/v1/auth/password` is not present here, despite working correctly and updating user's password; that may mean the endpoint is built from parts, or is no longer used but left as legacy
