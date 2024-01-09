#!/usr/bin/env python3
'''
FIFOCache Module
'''
from base_caching import BaseCaching
from collections import OrderedDict


class FIFOCache(BaseCaching):
    '''
    FIFOCache class that inherits from BaseCaching
    '''
    def __init__(self):
        '''
        call super to initialize BaseCaching
        '''
        super().__init__()
        self.cache_data = OrderedDict(self.cache_data)

    def put(self, key, item):
        '''
        assigns an item to the self.cache_data dictionary given a key
        '''
        if key is not None and item is not None:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                discarded_key, _ = self.cache_data.popitem(last=False)
                print('Discard: {}'.format(discarded_key))
            self.cache_data[key] = item

    def get(self, key):
        '''
        return the value in self.cache_data linked to key
        '''
        return self.cache_data.get(key, None)
