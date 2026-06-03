export default function ErrorBlock({ message = 'Что-то пошло не так', onRetry }) {
    return (
        <div className="alert alert-danger text-center" role="alert">
            <p className="mb-2">{message}</p>
            {onRetry && (
                <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
                    Повторить
                </button>
            )}
        </div>
    );
}
