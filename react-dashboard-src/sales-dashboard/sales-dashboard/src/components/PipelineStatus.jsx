export default function PipelineStatus({ files }) {
  if (!files || files.length === 0) {
    return <p className="empty-state">No pipeline config data yet.</p>;
  }

  return (
    <div className="pipeline-status-list">
      {files.map((file) => (
        <div className="pipeline-status-row" key={file.fileName}>
          <span className="pipeline-file-name">{file.fileName}</span>
          <span className={`pill ${file.isProcessed ? 'pill-success' : 'pill-pending'}`}>
            {file.isProcessed ? 'Processed' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}
