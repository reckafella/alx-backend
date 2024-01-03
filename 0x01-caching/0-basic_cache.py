#!/usr/bin/env python3
'''
BasicCache Module
'''
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    '''
    BasicCache class that inherits from BaseCaching
    '''
    def __init__(self):
        '''
        call super to initialize BaseCaching
        '''
        super().__init__()

    def put(self, key, item):
        '''
        assigns an item to the self.cache_data dictionary given a key
        '''
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        '''
        return the value in self.cache_data linked to key

        if key is None or self.cache_data[key] == None:
            return None
        '''
        return self.cache_data.get(key, None)
