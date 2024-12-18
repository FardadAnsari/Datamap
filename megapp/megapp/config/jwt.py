
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(hours=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': "@flkjkltrhjknloghr0798HGlortyjh%$krtghiIIIIpp)&887ert455(*YYYY]d1",
    'AUTH_HEADER_TYPES': ('Bearer',)
}