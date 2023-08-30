import { Col, Row, Select } from 'antd';
import { FC } from 'react';

import { platforms, sortBy, tags } from '../../api/filtersData';
import { Filters } from '../../api/freeToPlayApi';
import { useAppDispatch } from '../../hooks/hooks';
import { fetchGamesList, filtersChange } from './gamesListSlice';

const prepareFilters = (filtersData: string[]) =>
  filtersData.map((filter) => ({
    value: filter,
    label: filter.split('-').join(' '),
  }));

type GamesFiltersProps = {
  filters: Filters;
  loading: boolean;
};

export const GamesFilters: FC<GamesFiltersProps> = ({ filters, loading }) => {
  const dispatch = useAppDispatch();

  const handleChange = (filter: string, value: string) => {
    const newFilters = { ...filters, [filter]: value };
    dispatch(filtersChange(newFilters));
    dispatch(fetchGamesList());
  };

  return (
    <Row gutter={[16, 16]} justify="center">
      <Col>
        <Select
          style={{ minWidth: 150 }}
          value={filters['platform']}
          onChange={(value: string) => handleChange('platform', value)}
          options={platforms}
          disabled={loading}
        />
      </Col>
      <Col>
        <Select
          style={{ minWidth: 150 }}
          value={filters['category']}
          onChange={(value: string) => handleChange('category', value)}
          options={[...prepareFilters(tags), { label: 'All Genres', value: 'all' }]}
          disabled={loading}
        />
      </Col>
      <Col>
        <Select
          style={{ minWidth: 150 }}
          value={filters['sortBy']}
          onChange={(value: string) => handleChange('sortBy', value)}
          options={prepareFilters(sortBy)}
          disabled={loading}
        />
      </Col>
    </Row>
  );
};
