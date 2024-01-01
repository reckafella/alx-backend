#!/usr/bin/env python3
'''
Module with a function that returns a tuple of size two containing a\
    start index and an end index corresponding to the range of indexes\
        to return in a list for those particular pagination parameters.
'''


def index_range(page: int, page_size: int) -> tuple:
    '''
    The function should return a tuple of size two containing a start index\
        and an end index corresponding to the range of indexes to return in a\
            list for those particular pagination parameters.
    '''
    start_index: int = (page - 1) * page_size
    end_index: int = start_index + page_size

    return tuple([start_index, end_index])
