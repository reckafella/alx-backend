#!/usr/bin/env python3
'''
Module with a function that returns a tuple of size two containing a\
    start index and an end index corresponding to the range of indexes\
        to return in a list for those particular pagination parameters.
'''
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    '''
    The function should return a tuple of size two containing a start index\
        and an end index corresponding to the range of indexes to return in a\
            list for those particular pagination parameters.
    '''
    start_index: int = (page - 1) * page_size
    end_index: int = start_index + page_size

    return tuple([start_index, end_index])


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''
        return a list of pages
        '''
        assert isinstance(page, int) and page > 0,\
            "page should be an integer greater than 0"
        assert isinstance(page_size, int) and page_size > 0,\
            "page_size should be an integer greater than 0"

        start_index, end_index = index_range(page=page, page_size=page_size)
        page_rows = []
        csv_data = self.dataset()

        for row in range(0, len(csv_data) - 1):
            if start_index <= row and row < end_index:
                page_rows.append(csv_data[row])

        return page_rows
