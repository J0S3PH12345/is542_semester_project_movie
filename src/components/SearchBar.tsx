type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: React.SubmitEventHandler<HTMLFormElement>;
  placeholder?: string;
};

export function SearchBar({ value, onChange, onSubmit, placeholder }: Props) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search for a movie..."}
      />
      <button className="primary-button" type="submit">
        Search
      </button>
    </form>
  );
}