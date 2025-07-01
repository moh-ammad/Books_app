import Form from 'next/form'
import FormReset from './formReset';
import { Search } from 'lucide-react';
import { Button } from './ui/button';

const SearchForm = (
    {query}:{
        query?: string
    }
) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input 
      key={query}
      name="query" className='search-input' 
      placeholder='Search StartUps'
      defaultValue={query}
      />
  <div className="flex gap-2">
                {query && <FormReset/>}

                <Button type="submit" className="search-btn text-white">
                    <Search className="size-5" />
                </Button>
            </div>
    </Form>
  )
}

export default SearchForm
    